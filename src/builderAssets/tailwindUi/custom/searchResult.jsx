import Image from "next/image";

export default function SearchResult({
  title = "OpenAI - ChatGPT",
  link = "www.openai.com/chatgpt",
  subtitle = "www.openai.com/chatgpt",
  imageUrl = "https://via.placeholder.com/100",
  description = "ChatGPT is a large language model trained by OpenAI, capable of generating human-like text and assisting with a variety of tasks.",
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200">
      {/* Preview Image */}
      <div className="w-full sm:w-24 h-24 sm:h-auto flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          width={100}
          height={100}
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col">
        {/* Title */}
        <a
          href={link}
          className="text-blue-700 text-lg sm:text-xl font-semibold hover:underline"
        >
          {title}
        </a>

        {/* Subtitle (URL) */}
        <a
          href="#"
          className="text-gray-600 text-sm sm:text-base truncate hover:underline"
        >
          {subtitle}
        </a>

        {/* Description */}
        <p className="text-gray-700 text-sm sm:text-base mt-1">{description}</p>
      </div>
    </div>
  );
}
