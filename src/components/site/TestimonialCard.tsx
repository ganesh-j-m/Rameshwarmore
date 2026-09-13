// import Image from "next/image";
// import { Quote } from "lucide-react";

// export function TestimonialCard({
//   name,
//   role,
//   organization,
//   testimonial,
//   profileImage,
// }: {
//   name: string;
//   role?: string | null;
//   organization?: string | null;
//   testimonial: string;
//   profileImage?: string | null;
// }) {
//   return (
//     <div className="rounded-md border border-line bg-white p-6">
//       <Quote className="text-gold" size={22} />
//       <p className="mt-3 text-sm leading-relaxed text-inkSoft">{testimonial}</p>
//       <div className="mt-4 flex items-center gap-3">
//         {profileImage && (
//           <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line">
//             <Image src={profileImage} alt={name} fill sizes="40px" className="object-cover" />
//           </div>
//         )}
//         <div>
//           <p className="text-sm font-medium text-ink">{name}</p>
//           {(role || organization) && (
//             <p className="text-xs text-inkSoft">{[role, organization].filter(Boolean).join(", ")}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
