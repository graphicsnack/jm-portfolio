type MaxHeightImageViewportProps = {
  src: string;
  alt: string;
  priority?: boolean;
  maxHeightClass?: string;
  className?: string;
  imageClassName?: string;
};

export function MaxHeightImageViewport({
  src,
  alt,
  priority = false,
  maxHeightClass = "max-h-[36rem]",
  className,
  imageClassName,
}: MaxHeightImageViewportProps) {
  return (
    <figure className={["overflow-hidden rounded-lg border border-black/12 bg-white", maxHeightClass, className ?? ""].filter(Boolean).join(" ")}>
      <img
        src={src}
        alt={alt}
        className={["block h-auto w-full object-cover object-top", imageClassName ?? ""].filter(Boolean).join(" ")}
        loading={priority ? "eager" : "lazy"}
      />
    </figure>
  );
}
