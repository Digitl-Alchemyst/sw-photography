import Image from 'next/image';

const GearCard = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className='flex h-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg bg-steeldark-400 px-6 py-3 shadow-md'>
      <h3 className='py-2 text-sm font-semibold'>{name}</h3>
      <div className='relative h-52 w-62'>
        <Image
          src={image}
          alt={name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 90vw'
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
    </div>
  );
};

export default GearCard;
