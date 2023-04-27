import RegisterForm from "../../components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              //
              src="https://i-static.techmo.global/uploads/institutional/registro3.png"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12 bg-gradient-to-t from-gray-900 to-transparent w-full">
              <a className="block text-white" href="/">
                <span className="sr-only">Home</span>

                <img
                  src="https://i-static.techmo.global/uploads/techmo-small2.svg"
                  className="h-8 sm:h-10"
                  alt="TechMo logo"
                />
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Bienvenido a TechMo 👋
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Completá el formulario con tus datos para registrarte en el
                sitio
              </p>
            </div>
          </section>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6 "
          >
            <div className="max-w-xl lg:max-w-3xl w-full">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <img
                    src="https://i-static.techmo.global/uploads/techmo-small2.svg"
                    className="h-8 sm:h-10"
                    alt="TechMo logo"
                  />
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Bienvenido a TechMo 👋
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Completá el formulario con tus datos para registrarte en el
                  sitio
                </p>
              </div>

              <div className={"py-6"}>
                <div className="grid grid-cols-2 gap-x-3 todo">
                  <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100 ">
                    <img
                      className={"w-5 h-5"}
                      src="https://i-static.techmo.global/uploads/mini-google.svg"
                      alt="Google logo login button"
                    />
                  </button>
                  <button className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                    <img
                      className={"w-5 h-5"}
                      src="https://i-static.techmo.global/uploads/mini-facebook.svg"
                      alt="Facebook logo login button"
                    />
                  </button>
                </div>
              </div>
              <div className="relative">
                <span className="block w-full h-px bg-gray-300"></span>
                <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
                  O continuá con
                </p>
              </div>
              <RegisterForm />
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
