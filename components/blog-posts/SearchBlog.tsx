import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { memo } from "react";

const SearchBlog = ({
  handleOnSubmit,
  searchTerm,
  handleSearch,
}: {
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form
      className="space-y-0 flex items-center gap-2 flex-wrap"
      onSubmit={handleOnSubmit}
    >
      <div className="lg:w-[85%] w-[100%]">
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Search blog by title, slug or state"
          value={searchTerm}
          onChange={handleSearch}
          required
        />
      </div>

      <Button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white lg:w-[12%] w-[20%]"
      >
        Search
      </Button>
    </form>
  );
};

export default memo(SearchBlog);
