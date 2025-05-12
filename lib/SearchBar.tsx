import Form from "next/form";
import Image from "next/image";

function SearchBar() {
  return (
    <div className="max-w-full flex justify-between text-white bg-secondary rounded-[50px] border px-[3vw] py-[2vh]">
      <Form className="w-full flex" action="/">
        <input
          className="w-full text-lg text-white"
          placeholder="Search City..."
          name="query"
        />
        <button
          className="cursor-pointer text-lg border-l-2 pl-[1vw] "
          type="submit"
        >
          <Image
            src="/images/search-icon.png"
            alt="search icon"
            width={32}
            height={32}
          />
        </button>
      </Form>
    </div>
  );
}
export default SearchBar;
