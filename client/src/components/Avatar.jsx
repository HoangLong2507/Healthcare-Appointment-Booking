import { FaRegUserCircle } from "react-icons/fa";

export default function Avatar ({avatar,className="w-full h-full"}) {
  return(
    <> {
      avatar? (<img src={avatar} alt="avatar" className={`rounded-full ${className} object-cover border`} />)
      : (<FaRegUserCircle/>)
    }
    </>
  )
}