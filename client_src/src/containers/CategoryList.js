import React from "react";
import CategoryItem from "../components/CategoryItem";

const CategoryList = ({ categories }) => {
  return (
    <div className="col-sm-12 col-md-3">
      <h4>Categories</h4>
      <CategoryItem categories={categories} />
    </div>
  );
};

export default CategoryList;
