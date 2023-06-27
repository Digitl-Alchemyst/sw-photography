import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex h-96 flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Welcome to my Photography Portfolio
        </h1>
        <p className="text-2xl text-center">
          This is a collection of my favorite photos Ive taken over the years.
        </p>

      </div>
      

    </main>
  )
}
