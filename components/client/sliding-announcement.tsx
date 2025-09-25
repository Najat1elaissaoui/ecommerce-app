"use client"

const SlidingAnnouncement = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[51] bg-red-600 text-white overflow-hidden h-12">
      <div className="flex justify-center items-center h-12">
        <p className="text-center text-base font-medium">
          التوصيل بالمجان و الدفع عند الإستلام
        </p>
      </div>
    </div>
  );
};

export default SlidingAnnouncement;