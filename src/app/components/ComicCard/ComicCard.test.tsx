import { render, screen } from "@testing-library/react";
import ComicCard from "./ComicCard";
import getYearFromDate from "../../helpers/getYearFromDate";
import "@testing-library/jest-dom";
import { ComicI } from "../../interfaces/Comics";
import createMockComic from "@/app/test/MockComic";

jest.mock("../../helpers/getYearFromDate", () => jest.fn());

describe("ComicCard", () => {
  const mockComic = createMockComic();

  beforeEach(() => {
    (getYearFromDate as jest.Mock).mockReturnValue("2023");
  });

  test("should render the image, title, and date correctly", () => {
    render(<ComicCard comic={mockComic as ComicI} />);

    const img = screen.getByRole("img", { name: mockComic.title });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "/_next/image?url=http%3A%2F%2Fexample.com%2Fimage.jpg&w=384&q=75"
    );
    expect(img).toHaveAttribute("alt", mockComic.title);

    const title = screen.getByText(mockComic.title);
    expect(title).toBeInTheDocument();

    const date = screen.getByText("2023");
    expect(date).toBeInTheDocument();
  });
});
