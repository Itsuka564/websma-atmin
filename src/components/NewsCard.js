
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({
  id,
  image,
  title,
  date,
  excerpt,
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/berita/${id}`} className="block">
        <div className="overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={720}
            height={480}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <p className="text-sm font-semibold text-[#064ea2]">
            {date}
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900 transition group-hover:text-[#064ea2]">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 font-semibold text-slate-900">
            Baca Selengkapnya
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
