import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

interface MovieModal {
  title: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleChange: (e: any) => void;
  categories: { id: number; name: string }[];
}

export default function Modal({
  title,
  openModal,
  setOpenModal,
  handleSubmit,
  handleChange,
  categories,
}: MovieModal) {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${openModal ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        onClick={() => setOpenModal(false)}
      >

        <div className="absolute inset-0 bg-black/50" > </div>

        {/* Modal Content */}
        <div
          className="text-blue-900 relative bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-lg">{title}</h3>


          <div className="py-4">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange} />
          </div>

          <div className="py-4">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange} />
          </div>

          <div className="py-4">
            <label htmlFor="rating">Rating</label>
            <input type="number" name="rating" className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange} />
          </div>

          <div className="py-4">
            <label htmlFor="release_year">Release year</label>
            <input type="number" name="release_year" className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange} />
          </div>

          <div className="py-4">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input type="text" name="thumbnail" className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange} />
          </div>

          <div className="py-4">
            <label htmlFor="video_url">Video URL</label>
            <input type="text" name="video_url" className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange} />
          </div>

          <div className="py-4">
            <label htmlFor="category_id">Category</label>
            <select name="category_id" className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange} >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}> {cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className="px-4 py-2 bg-blue-900 opacity-80 text-white rounded hover:cursor-pointer"
              onClick={handleSubmit}
            >
              <AiFillSave />
            </button>

            <button
              className="flex items-center px-4 py-2 bg-blue-900 opacity-80 text-white rounded hover:cursor-pointer"
              onClick={() => setOpenModal(false)}
            > <AiFillCloseCircle />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}