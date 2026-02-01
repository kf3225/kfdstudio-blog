import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <div>
      <h1 class="text-4xl font-bold text-blue-600">Hello World</h1>
    </div>,
  );
});
