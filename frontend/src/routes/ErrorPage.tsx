import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">
          Erro 404 - Página não encontrada
        </h1>
        <p className="text-gray-600">
          Oops! Parece que a página que você está procurando não existe.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
