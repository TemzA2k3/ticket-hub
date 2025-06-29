import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { fetchCategories } from "../../app/store/api/categories/categotiesThunks";
import { categoryIcons } from "../utils/categoryIcons"

import { Loader } from "./Loader"


export const CategoryEventCard = () => {
  const dispatch = useAppDispatch();
  const { items: rawCategories, loading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoriesWithIcons = rawCategories.map((category) => ({
    ...category,
    icon: categoryIcons[category.title] || "fa-solid fa-tag",
  }));

  const formatCategoryTitle = (title: string) => {
    return title.toLowerCase().replace(/ /g, "_");
  }

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-[2rem] font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground">Find events that match your interests</p>
        </div>


        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" variant="dots" text="Loading events..." />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        ) : (
          <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {categoriesWithIcons.map(({ icon, title, count }) => (
              <Link
                key={title}
                to={`/events?page=1&category=${formatCategoryTitle(title)}`}
                className="flex flex-col items-center justify-center text-center p-6 bg-background border border-border rounded shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/5 text-primary mb-4">
                  <i className={icon}></i>
                </div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{count} events</p>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};