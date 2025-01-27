import { PropsWithChildren } from "react";

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className="text-center text-2xl text-white bg-red-600 my-5 font-bold uppercase p-3">
        {children}
    </div>
  )
}
