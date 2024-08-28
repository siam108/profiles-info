import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='flex flex-col gap-7 items-center justify-center h-screen'>
            <h1 className='text-3xl'>Opps !!</h1>
            <Link to='/' className='btn btn-primary'>Go back</Link>

        </div>
    );
};

export default Error;