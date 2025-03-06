import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="box-border h-full w-full bg-stone-50 flex flex-col items-center justify-center px-6 py-8 text-center">
      <h1 className="text-4xl font-bold text-stone-700 mb-4">404</h1>
      <p className="text-lg text-stone-400 mb-6">
        Ой! Такой страницы нет в проекте. Возможно, она была удалена или вы
        ввели неправильный адрес.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 font-medium bg-stone-500 hover:bg-stone-600 text-white rounded-lg"
        >
          Назад
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 font-medium bg-stone-700 hover:bg-stone-800 text-white rounded-lg"
        >
          На главную
        </button>
      </div>
    </div>
  );
}
