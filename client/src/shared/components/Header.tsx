import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks/useTypedReduxUtils";
import { logoutUser } from "../../app/store/api/auth/logoutUser";
import { getAvatarUrl } from "../utils/profileUtils"

import { Button } from "./Buttons";
import { LanguageSwitcher } from "./LanguageSwitcher";



export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false);
    navigate('/');
  };

  // const getInitials = (firstName?: string, lastName?: string) => {
  //   if (!firstName) return 'U';
  //   const firstInitial = firstName.charAt(0).toUpperCase();
  //   const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  //   return firstInitial + lastInitial;
  // };

  // const getAvatarUrl = (user: IUser) => {
    
  //   if (user?.avatarUrl) {
  //     return import.meta.env.VITE_API_BASE_URL + user.avatarUrl;
  //   }
  //   const initials = getInitials(user?.firstName, user?.lastName);
  //   return `https://ui-avatars.com/api/?name=${initials}&background=000&color=fff&size=40&rounded=true`;
  // };

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
            <i className="fa-solid fa-ticket"></i>
            <span>TicketHub</span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-4">
              <li>
                <Link to="/events" className="hover:underline underline-offset-4">
                  {t("header.events")}
                </Link>
              </li>
              {/* <li>
                <Link to="/venues" className="hover:underline underline-offset-4">
                  {t("header.venues")}
                </Link>
              </li> */}
              <li>
                <Link to="/about" className="hover:underline underline-offset-4">
                  {t("header.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline underline-offset-4">
                  {t("header.contact")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-4 items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0 border-0 outline-none"
                >
                  <img
                    src={getAvatarUrl(user)}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-border"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-foreground">
                      {user.firstName} {user.lastName || ''}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50 py-2">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <img
                          src={getAvatarUrl(user)}
                          alt={`${user.firstName} ${user.lastName || ''}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-foreground">
                            {user.firstName} {user.lastName || ''}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <i className="fa-solid fa-user w-4"></i>
                        My Profile
                      </Link>

                      <Link
                        to="/my-tickets"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <i className="fa-solid fa-ticket w-4"></i>
                        My Tickets
                      </Link>

                      <Link
                        to="/favorites"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <i className="fa-solid fa-heart w-4"></i>
                        Favorites
                      </Link>
                      {user.verified && (
                        <Link
                          to="/create-event"
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <i className="fa-solid fa-calendar-plus w-4"></i>
                          Create Event
                        </Link>
                      )}

                      <div className="border-t border-border my-2"></div>

                      <Link
                        to="/contact"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <i className="fa-solid fa-question-circle w-4"></i>
                        Help & Support
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors duration-200 w-full text-left text-destructive hover:text-destructive"
                      >
                        <i className="fa-solid fa-sign-out-alt w-4"></i>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline">{t("header.signIn")}</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">{t("header.signUp")}</Button>
                </Link>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};