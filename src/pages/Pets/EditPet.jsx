export default function EditPet() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Mascota</h1>
      <form className="flex flex-col gap-4">
        <input className="border p-2 rounded" type="text" placeholder="Nombre de la mascota" />
        <input className="border p-2 rounded" type="text" placeholder="Especie" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Actualizar
        </button>
      </form>
    </div>
  );
}