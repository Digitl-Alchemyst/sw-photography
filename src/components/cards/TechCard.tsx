import Image from 'next/image';

const TechCard = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
  return (
    <div className='flex h-full min-h-32 max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg bg-steeldark-500 px-6 py-3 shadow-md'>
      <div className='relative h-18 w-18'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='p-4'>
        <h3 className='text-nowrap font-semibold'>{title}</h3>
      </div>
    </div>
  );
};

export default TechCard;
