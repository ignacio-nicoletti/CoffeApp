import ItemsView from "../../src/views/itemsView/items";

export default function Items() {
  return (
    <main className="relative flex flex-col w-full bg-[--background] min-h-screen gap-10">
      <ItemsView/>
    </main>
  );
}
