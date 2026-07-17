export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-md my-4">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}