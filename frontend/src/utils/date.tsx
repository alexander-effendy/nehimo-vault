export const formatCreatedDate = (dateStr: string):string => {
  
  const createdDate = new Date(dateStr);
  const now = new Date();

  const diffMs = now.getTime() - (createdDate.getTime());
  const diffDays = diffMs / (1000 * 60 * 60 * 24);


  if (diffDays < 7) {
    const daysAgo = Math.floor(diffDays);
    if (daysAgo <= 0) return "Today";
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else {
    return createdDate.toLocaleDateString();
  }
}
