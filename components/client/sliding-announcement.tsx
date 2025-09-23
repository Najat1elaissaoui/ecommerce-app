"use client"

const SlidingAnnouncement = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[51] bg-red-600 text-white overflow-hidden h-12">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center h-12">
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center h-12">
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
          <span className="mx-7 text-base font-medium">شحن مجاني - متتبع بالكامل، والضرائب والرسوم مشمولة. التوصيل مباشرة إلى باب منزلك!</span>
        </div>
      </div>
    </div>
  );
};

export default SlidingAnnouncement;