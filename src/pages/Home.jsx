import Nav from '../components/Header/Nav'

const Home = () => {
  return (
    <div className='bg-fountain-blue-600'>
        <Nav/>
        <div className='flex items-center justify-center h-[100vh] p-90 text-fountain-blue-50'>
            <h1 className='text-5xl font-bold'>Welcome to TR | SONG</h1>
            
        </div>
    </div>
  )
}

export default Home