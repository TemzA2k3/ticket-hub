import { useEffect, useState, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { fetchProfileData, changePersonalInformation, uploadAvatar } from "../../app/store/api/profile/profileThunks";
import { useAlert } from "../../app/hooks/useAlert";

import { Loader } from "./Loader"
import { AlertWrapper } from "./AlertWrapper"

import { readonlyFields, getAvatarUrl } from "../utils/profileUtils"

export const UserProfile = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const { profileData, loading, error } = useAppSelector((state) => state.profile);
  const { showAlert, alertMessage, alertType, showTemporaryAlert } = useAlert();  
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(profileData?.personalInfo || []);

  const handleEditClick = () => {
    if (profileData) {
      setEditedInfo(profileData.personalInfo);
      setIsEditing(true);
    }
  };

  const handleSaveClick = async () => {
    if (userId) {
      const result = await dispatch(changePersonalInformation({ 
        userId, 
        userPersonalInformation: editedInfo 
      }));
      
      if (changePersonalInformation.fulfilled.match(result)) {
        setIsEditing(false);
        showTemporaryAlert("Profile updated successfully!", "success");
      } else {
        showTemporaryAlert("Failed to update profile. Please try again.", "error");
      }
    }
  };

  const handleFieldChange = (index: number, newValue: string) => {
    const updated = [...editedInfo];
    updated[index] = { ...updated[index], value: newValue };
    setEditedInfo(updated);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showTemporaryAlert("Please select an image file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showTemporaryAlert("File size should be less than 5MB", "error");
      return;
    }

    const result = await dispatch(uploadAvatar({ userId, file }));
    
    if (uploadAvatar.fulfilled.match(result)) {
      showTemporaryAlert("Avatar updated successfully!", "success");
    } else {
      showTemporaryAlert("Failed to upload avatar", "error");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      showTemporaryAlert(error, "error");
    }
  }, [error]);


  return (
    <main className="py-8">

      <AlertWrapper 
        showAlert={showAlert}
        alertMessage={alertMessage}
        alertType={alertType}
      />

      {loading && (
        <div className="flex justify-center py-20">
          <Loader size="lg" variant="dots" text="Loading profile..." />
        </div>
      )}

      {profileData && (
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start border-b border-border py-8 mb-8">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="relative inline-block">
                <img
                  src={getAvatarUrl(profileData)}
                  alt={profileData.firstName}
                  className="w-32 h-32 rounded-full border-2 border-border object-cover"
                />
                <button 
                  onClick={handleAvatarClick}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm hover:bg-primary/90 transition-colors"
                >
                  <i className="fa-solid fa-camera" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{profileData.firstName} {profileData.lastName}</h1>
              <p className="text-muted-foreground mb-1">{profileData.title}</p>
              <p className="text-muted-foreground mb-4">{profileData.email}</p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-calendar-check" />
                  <span>Member since {profileData.memberSince}</span>
                </div>
                {profileData.location && (
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot" />
                    <span>{profileData.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-star" />
                  <span>{profileData.membership}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-6">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="rounded border border-border bg-background shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Personal Information</h2>
                  {isEditing ? (
                    <button
                      onClick={handleSaveClick}
                      className="px-4 py-2 text-sm rounded text-white bg-primary hover:bg-primary/90"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleEditClick}
                      className="p-2 text-muted-foreground rounded hover:bg-muted"
                    >
                      <i className="fa-solid fa-edit" />
                    </button>
                  )}
                </div>
                <div className="px-6 py-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {(isEditing ? editedInfo : profileData.personalInfo).map(({ label, value, full }, idx) => {
                    const isReadonly = readonlyFields.includes(label);
                    const showInput = isEditing && !isReadonly;

                    return (
                      <div key={idx} className={`flex flex-col gap-2 ${full ? "col-span-full" : ""}`}>
                        <label className="text-sm font-medium text-muted-foreground">{label}</label>
                        {showInput ? (
                          <input
                            type={label === "Date of Birth" ? "date" : "text"}
                            className="bg-white border border-border rounded px-4 py-2"
                            value={value || ""}
                            onChange={(e) => handleFieldChange(idx, e.target.value)}
                          />
                        ) : (
                          <div className="bg-muted border border-border rounded px-4 py-2 min-h-[2.5rem]">{value || '\u00A0'}</div>
                        )}
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Settings */}
              {/* <div className="rounded border border-border bg-background shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Account Settings</h2>
                </div>
                <div className="px-6 py-4 space-y-6">
                  {profileData.settings.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border border-border rounded px-4 py-3">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <label className="relative inline-block w-11 h-6">
                        <input type="checkbox" defaultChecked={item.checked} className="peer sr-only" />
                        <span className="absolute inset-0 rounded-full bg-border transition before:absolute before:left-1 before:bottom-1 before:bg-background before:h-4 before:w-4 before:rounded-full before:transition peer-checked:bg-primary peer-checked:before:translate-x-5" />
                      </label>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Security */}
              {/* <div className="rounded border border-border bg-background shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Security & Privacy</h2>
                </div>
                <div className="px-6 py-4 space-y-6">
                  {profileData.security.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border border-border rounded px-4 py-3">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 ${item.variant === "primary" ? "bg-primary text-white" : "border border-border hover:bg-accent"}`}>{item.action}</button>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="rounded border border-border bg-background shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Activity Overview</h2>
                </div>
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  {profileData.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 border border-border rounded">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary">
                        <i className={`fa-solid fa-${stat.icon}`} />
                      </div>
                      <div>
                        <div className="text-lg font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {/* <div className="rounded border border-border bg-background shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Achievements</h2>
                </div>
                <div className="px-6 py-4 space-y-4">
                  {profileData.achievements.map((ach, idx) => (
                    <div key={idx} className={`flex items-center gap-4 border border-border rounded p-4 ${ach.earned ? "bg-muted" : "opacity-50"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ach.earned ? "bg-primary text-white" : "bg-border text-muted-foreground"}`}>
                        <i className={`fa-solid fa-${ach.icon}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{ach.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{ach.desc}</p>
                        {ach.percent && (
                          <div className="w-full h-1 rounded bg-border overflow-hidden">
                            <div className="h-full bg-primary rounded" style={{ width: `${ach.percent}%` }} />
                          </div>
                        )}
                      </div>
                      {ach.earned && (
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                          <i className="fa-solid fa-check" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
