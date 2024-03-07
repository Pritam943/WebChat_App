export default function Avatar({ userId, username }) {
  const colors = [
    "bg-red-300",
    "bg-green-300",
    "bg-purple-300",
    "bg-blue-300",
    "bg-yellow-300",
    "bg-teal-300",
  ];
  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  //   console.log(colorIndex);
  const color = colors[colorIndex];
  return (
    <div className={"w-9 h-9 rounded-full flex items-center " + color}>
      <div className="w-full text-center opacity-80">{username[0]}</div>
    </div>
  );
}
