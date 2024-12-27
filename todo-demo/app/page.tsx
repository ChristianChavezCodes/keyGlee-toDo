export default function Home() {
  return (
    <div className="h-screen w-screen flex-col space-y-6 p-6">
      <div className="place-self-center space-y-3 w-1/2">
        <h1 className="text-4xl font-bold">
          Welcome to the Keyglee Frontend Interview Template!
        </h1>
        <p>
          Feel free to alter or delete any of the code present in this
          next.js/react app.
        </p>
        <p>
          Alternatively you may use whatever frontend tools you feel more
          comfortable with!
        </p>
      </div>

      <div className="place-self-center space-y-3 w-1/2">
        <h2 className="text-2xl font-bold">Assignment Details</h2>
        <p>
          Create a basic TODO app using the provided backend. You shouldn&apos;t
          need to alter the backend, just worry about making the proper CRUD api
          calls to it.
        </p>
        <h4>Goals</h4>
        <ul>
          <li>Functionality to read the current TODOs from the API</li>
          <li>
            Functionality to create new TODOs from the frontend to the API
          </li>
          <li>Show off your coding style!</li>
        </ul>
        <h4>Optional</h4>
        <ul>
          <li>Functionality to update existing TODOs</li>
          <li>Functionality to delete existing TODOs</li>
        </ul>
        <p>
          Try to limit yourself to no more than 2 hours. We really don&apos;t
          want you spending all your free time working on this.
        </p>
        <h3 className="text-xl font-bold">The Frontend</h3>
        <p>
          The frontend provided is a starter for a react/next.js app. Feel free
          to build off of this or totally remove everything in `todo-demo` to
          make your own frontend app.
        </p>

        <h4>Tools being used Starter</h4>
        <ul>
          <li>Next.js</li>
          <li>React.js</li>
          <li>Tailwindcss</li>
          <li>Typescript</li>
        </ul>
        <p>
          Tailwindcss is currently disabled via the globals.css file, feel free
          to re-enable it.
        </p>
        <h3 className="text-xl font-bold">The Backend</h3>
        <p>
          The backend is a simple REST API that you can interact with via API
          calls from your frontend. By default the backend&apos;s base url will
          be `http://localhost:4000` with additional routes for the resource
          type itself (for example: GET `http://localhost:4000/todo` will get
          all todos).
        </p>
        <p>
          Additional API routes and documentation is provided in the
          repository&apos;s README.
        </p>
      </div>
    </div>
  );
}
