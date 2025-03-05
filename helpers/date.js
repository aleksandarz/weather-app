export function getFormattedDate(daysToAdd = 0)
{
    let date = new Date("2025-04-03");
    date.setDate(date.getDate() + daysToAdd);

    return date.toISOString().split("T")[0];
}