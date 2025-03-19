import nocharImage from '../assets/img/nochat.png'

const NoMessageShimmerUi = ()=>{
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className='flex items-center flex-col h-[100%] justify-center'>
            <img className='sm:w-[300px] w-[150px]' src={nocharImage} alt="NoChatImagee" />
            <p className='text-gray-500 sm:text-sm text-[10px] text-center'>Loading your conversation… Just kidding, send a message!🚀</p>
          </div>
        </div>
      );
}
export default NoMessageShimmerUi;