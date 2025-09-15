function getYearFromDate(dateString: string): number {
  if (!dateString || typeof dateString !== "string") {
    throw new Error("Invalid date string provided");
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }

  return date.getFullYear();
}
export default getYearFromDate;
