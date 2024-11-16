import { Disclosure } from '@headlessui/react';
import { FaChevronUp, FaChevronDown } from  "react-icons/fa"
// import Link from 'next/link';
const InfoTable = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="absolute top-0 mt-60 z-50 p-4 bg-white shadow-md rounded-md w-30 left-0 lg:mt-44">
          <Disclosure.Button className="flex justify-between items-center w-full p-2  rounded-md text-black font-bold">
            <span className='mr-2'>ข้อมูล</span>
            {open ? (
              <FaChevronUp className="w-5 h-5" />
            ) : (
              <FaChevronDown className="w-5 h-5" />
            )}
          </Disclosure.Button>

          <Disclosure.Panel className="mt-2">
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-white">
                  <th className="border border-gray-300 px-4 py-2 font-bold text-black">หัวข้อ</th>
                  <th className="border border-gray-300 px-4 py-2 font-bold text-black">รายละเอียด</th>
                  <th className="border border-gray-300 px-4 py-2 font-bold text-black">สถานที่</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-black">รถชน</td>
                  <td className="border border-gray-300 px-4 py-2 text-black">อุบัติเหตุหนัก</td>
                  {/* <Link href="/map"> */}
                  <td className="border border-gray-300 px-4 py-2 text-blue-500 font-bold underline">สถานที่</td>
                  {/* </Link> */}
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-black">รถชน</td>
                  <td className="border border-gray-300 px-4 py-2 text-black">รถจักรยานยนต์ชนรถพ่วง</td>
                  {/* <Link href="/map"> */}
                  <td className="border border-gray-300 px-4 py-2 text-blue-500 font-bold underline">สถานที่</td>
                  {/* </Link> */}
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-black">รถชน</td>
                  <td className="border border-gray-300 px-4 py-2 text-black">รถเมล์ชนฟุตบาท</td>
                  {/* <Link href="/map"> */}
                  <td className="border border-gray-300 px-4 py-2 text-blue-500 font-bold underline">สถานที่</td>
                  {/* </Link> */}
                </tr>
              </tbody>
            </table>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default InfoTable;
