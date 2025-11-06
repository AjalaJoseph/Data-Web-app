import { Suspense } from "react";
import Paymentpage from "@/app/Components/payment";
export default function page(){
  return(
    <Suspense fallback={<p>Loading...</p>}>
      <Paymentpage/>
    </Suspense>
  )
}