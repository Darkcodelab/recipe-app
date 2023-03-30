import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { fetchRecipes } from "../store/recipe/action";
import { toast } from "react-toastify";

// icons
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchForm() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const handleFormSubmit = handleSubmit(async (data) => {
    const res = await dispatch(fetchRecipes(data));
    if (!res.success) {
      toast.error(res.error);
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex justify-center items-center max-w-[600px] mx-auto bg-secondaryBlack p-3 rounded shadow-lg">
        <input
          type="text"
          {...register("query")}
          placeholder="Ingredients or Dish names..."
          className="w-full bg-transparent outline-none text-sm"
        />
        <button type="submit">
          <MagnifyingGlassIcon className="h-8" />
        </button>
      </div>
      <div className="flex flex-wrap justify-evenly gap-2 items-center max-w-[900px] mx-auto mt-4">
        <div className="max-w-[200px] w-full">
          <select
            className="bg-secondaryBlack  outline-none cursor-pointe text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("diet")}
          >
            <option value="">Diet - None</option>
            <option value="balanced">Balanced</option>
            <option value="high-fiber">High Fiber</option>
            <option value="high-protein">High protein</option>
            <option value="low-carb">Low Carb</option>
            <option value="low-fat">Low Fat</option>
            <option value="low-sodium">Low Sodium</option>
          </select>
        </div>
        <div className="max-w-[200px] w-full">
          <select
            className="bg-secondaryBlack  outline-none cursor-pointe text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("cuisineType")}
          >
            <option value="">Cuisine Type - None</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Central Europe">Central Europe</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern Europe">Eastern Europe</option>
            <option value="French">French</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Kosher">Kosher</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Nordic">Nordic</option>
            <option value="South American">South American</option>
            <option value="South East Asian">South East Asian</option>
          </select>
        </div>
        <div className="max-w-[200px] w-full">
          <select
            className="bg-secondaryBlack  outline-none cursor-pointe text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("mealType")}
          >
            <option value="">Meal Type - None</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dinner">Dinner</option>
            <option value="Lunch">Lunch</option>
            <option value="Snack">Snack</option>
            <option value="Teatime">Teatime</option>
          </select>
        </div>
        <div className="max-w-[200px] w-full">
          <select
            className="bg-secondaryBlack  outline-none cursor-pointe text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("dishType")}
          >
            <option value="">Dish Type - None</option>
            <option value="Biscuits and cookies"> Biscuits and cookies </option>
            <option value="Bread"> Bread </option>
            <option value="Cereals"> Cereals </option>
            <option value="Condiments and sauces">Condiments and sauces</option>
            <option value="Desserts"> Desserts </option>
            <option value="Drinks"> Drinks </option>
            <option value="Main course"> Main course </option>
            <option value="Pancake"> Pancake </option>
            <option value="Preps"> Preps </option>
            <option value="Preserve"> Preserve </option>
            <option value="Salad"> Salad </option>
            <option value="Sandwiches"> Sandwiches </option>
            <option value="Side dish"> Side dish </option>
            <option value="Soup"> Soup </option>
            <option value="Starter"> Starter </option>
            <option value="Sweets"> Sweets </option>
          </select>
        </div>
      </div>
    </form>
  );
}
export default SearchForm;
