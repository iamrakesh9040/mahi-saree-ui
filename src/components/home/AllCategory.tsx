import Link from "next/link";
import React from "react";
export const CATE_ARR = [
  {
    id: 1,
    name: "Imaging",
    image: "/asset/category/Imaging_icon.png",
    subcategories: [
      { id: 11, name: "X-ray", image: "xray.jpg" },
      { id: 12, name: "MRI", image: "mri.jpg" },
      { id: 13, name: "CT", image: "ct.jpg" },
      { id: 14, name: "Ultrasound", image: "ultrasound.jpg" },
      { id: 15, name: "Fluoroscopy", image: "fluoroscopy.jpg" },
      { id: 16, name: "Mammography", image: "mammography.jpg" },
      { id: 17, name: "Nuclear Medicine", image: "nuclear-medicine.jpg" },
      { id: 18, name: "Angiography", image: "angiography.jpg" },
      { id: 19, name: "PET", image: "pet.jpg" },
      { id: 20, name: "Bone Densitometry", image: "bone-densitometry.jpg" },
    ],
  },
  {
    id: 2,
    name: "Laboratory",
    image: "/asset/category/Laboratory_icon.png",
    subcategories: [
      { id: 21, name: "Microscopes", image: "microscopes.jpg" },
      { id: 22, name: "Centrifuges", image: "centrifuges.jpg" },
      { id: 23, name: "Blood Analyzers", image: "blood-analyzers.jpg" },
      { id: 24, name: "Chemistry Analyzers", image: "chemistry-analyzers.jpg" },
      {
        id: 25,
        name: "Hematology Analyzers",
        image: "hematology-analyzers.jpg",
      },
      { id: 26, name: "Incubators", image: "incubators.jpg" },
      { id: 27, name: "Autoclaves", image: "autoclaves.jpg" },
      { id: 28, name: "Refrigerators", image: "refrigerators.jpg" },
      { id: 29, name: "Pipettes", image: "pipettes.jpg" },
      { id: 30, name: "Microtomes", image: "microtomes.jpg" },
    ],
  },
  {
    id: 3,
    name: "Surgery",
    image: "/asset/category/Surgery_icon.png",
    subcategories: [
      { id: 31, name: "Scalpels", image: "scalpels.jpg" },
      { id: 32, name: "Forceps", image: "forceps.jpg" },
      { id: 33, name: "Surgical Lights", image: "surgical-lights.jpg" },
      { id: 34, name: "Operating Tables", image: "operating-tables.jpg" },
      { id: 35, name: "Anesthesia Machines", image: "anesthesia-machines.jpg" },
      { id: 36, name: "Suction Devices", image: "suction-devices.jpg" },
      { id: 37, name: "Surgical Drills", image: "surgical-drills.jpg" },
      { id: 38, name: "Endoscopes", image: "endoscopes.jpg" },
      {
        id: 39,
        name: "Laparoscopic Instruments",
        image: "laparoscopic-instruments.jpg",
      },
      { id: 40, name: "Cautery Machines", image: "cautery-machines.jpg" },
    ],
  },
  {
    id: 4,
    name: "Monitoring",
    image: "/asset/category/Monitoring_icon.png",
    subcategories: [
      {
        id: 41,
        name: "Blood Pressure Monitors",
        image: "blood-pressure-monitors.jpg",
      },
      { id: 42, name: "Pulse Oximeters", image: "pulse-oximeters.jpg" },
      { id: 43, name: "ECG Monitors", image: "ecg-monitors.jpg" },
      {
        id: 44,
        name: "Respiratory Monitors",
        image: "respiratory-monitors.jpg",
      },
      {
        id: 45,
        name: "Temperature Monitors",
        image: "temperature-monitors.jpg",
      },
      { id: 46, name: "Cardiac Monitors", image: "cardiac-monitors.jpg" },
      {
        id: 47,
        name: "Intracranial Pressure Monitors",
        image: "intracranial-pressure-monitors.jpg",
      },
      { id: 48, name: "Fetal Monitors", image: "fetal-monitors.jpg" },
      { id: 49, name: "Apnea Monitors", image: "apnea-monitors.jpg" },
      {
        id: 50,
        name: "Capnography Monitors",
        image: "capnography-monitors.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Respiratory",
    image: "/asset/category/Respiratory_icon.png",
    subcategories: [
      { id: 51, name: "Ventilators", image: "ventilators.jpg" },
      {
        id: 52,
        name: "Oxygen Concentrators",
        image: "oxygen-concentrators.jpg",
      },
      { id: 53, name: "CPAP Machines", image: "cpap-machines.jpg" },
      { id: 54, name: "Nebulizers", image: "nebulizers.jpg" },
      { id: 55, name: "Spirometers", image: "spirometers.jpg" },
      { id: 56, name: "Peak Flow Meters", image: "peak-flow-meters.jpg" },
      { id: 57, name: "Tracheostomy Tubes", image: "tracheostomy-tubes.jpg" },
      { id: 58, name: "Breathing Circuits", image: "breathing-circuits.jpg" },
      { id: 59, name: "Oxygen Masks", image: "oxygen-masks.jpg" },
      { id: 60, name: "Humidifiers", image: "humidifiers.jpg" },
    ],
  },
  {
    id: 6,
    name: "Dental",
    image: "/asset/category/Dental_icon.png",
    subcategories: [
      { id: 61, name: "Dental Chairs", image: "dental-chairs.jpg" },
      { id: 62, name: "Dental X-ray", image: "dental-xray.jpg" },
      { id: 63, name: "Dental Drills", image: "dental-drills.jpg" },
      { id: 64, name: "Curing Lights", image: "curing-lights.jpg" },
      { id: 65, name: "Dental Scalers", image: "dental-scalers.jpg" },
      {
        id: 66,
        name: "Autoclaves (for dental instruments)",
        image: "autoclaves-dental.jpg",
      },
      { id: 67, name: "Dental Impressions", image: "dental-impressions.jpg" },
      { id: 68, name: "Amalgamators", image: "amalgamators.jpg" },
      { id: 69, name: "Dental Handpieces", image: "dental-handpieces.jpg" },
      { id: 70, name: "Intraoral Cameras", image: "intraoral-cameras.jpg" },
    ],
  },
  {
    id: 7,
    name: "Cardiology",
    image: "/asset/category/cardiology_icon.png",
    subcategories: [
      { id: 71, name: "Defibrillators", image: "defibrillators.jpg" },
      { id: 72, name: "Echocardiography", image: "echocardiography.jpg" },
      { id: 73, name: "Holter Monitors", image: "holter-monitors.jpg" },
      { id: 74, name: "Cardiac Catheters", image: "cardiac-catheters.jpg" },
      { id: 75, name: "Pacemakers", image: "pacemakers.jpg" },
      { id: 76, name: "Cardiac Stents", image: "cardiac-stents.jpg" },
      { id: 77, name: "Atherectomy Devices", image: "atherectomy-devices.jpg" },
      { id: 78, name: "Cardiac MRI", image: "cardiac-mri.jpg" },
      { id: 79, name: "Cardiac CT", image: "cardiac-ct.jpg" },
      { id: 80, name: "Cardiac Ultrasound", image: "cardiac-ultrasound.jpg" },
    ],
  },
  {
    id: 8,
    name: "Rehabilitation",
    image: "/asset/category/regabiliatition.png",
    subcategories: [
      { id: 81, name: "Wheelchairs", image: "wheelchairs.jpg" },
      { id: 82, name: "Walking Aids", image: "walking-aids.jpg" },
      { id: 83, name: "Prosthetics", image: "prosthetics.jpg" },
      { id: 84, name: "Orthotics", image: "orthotics.jpg" },
      { id: 85, name: "Treadmills", image: "treadmills.jpg" },
      { id: 86, name: "Exercise Bikes", image: "exercise-bikes.jpg" },
      { id: 87, name: "Parallel Bars", image: "parallel-bars.jpg" },
      { id: 88, name: "Gait Belts", image: "gait-belts.jpg" },
      { id: 89, name: "Mobility Scooters", image: "mobility-scooters.jpg" },
      { id: 90, name: "Hoyer Lifts", image: "hoyer-lifts.jpg" },
    ],
  },
  {
    id: 9,
    name: "Emergency",
    image: "/asset/category/emergency.png",
    subcategories: [
      {
        id: 91,
        name: "Ambulance Stretchers",
        image: "ambulance-stretchers.jpg",
      },
      { id: 92, name: "First Aid Kits", image: "first-aid-kits.jpg" },
      { id: 93, name: "Suction Pumps", image: "suction-pumps.jpg" },
      { id: 94, name: "Oxygen Tanks", image: "oxygen-tanks.jpg" },
      { id: 95, name: "Defibrillator Pads", image: "defibrillator-pads.jpg" },
      { id: 96, name: "Triage Tags", image: "triage-tags.jpg" },
      { id: 97, name: "Spine Boards", image: "spine-boards.jpg" },
      { id: 98, name: "Cervical Collars", image: "cervical-collars.jpg" },
      { id: 99, name: "Tourniquets", image: "tourniquets.jpg" },
      { id: 100, name: "IV Infusion Sets", image: "iv-infusion-sets.jpg" },
    ],
  },
  {
    id: 10,
    name: "Orthopedics",
    image: "/asset/category/joint.png",
    subcategories: [
      { id: 101, name: "Crutches", image: "crutches.jpg" },
      { id: 102, name: "Orthopedic Beds", image: "orthopedic-beds.jpg" },
      {
        id: 103,
        name: "Orthopedic Implants",
        image: "orthopedic-implants.jpg",
      },
      { id: 104, name: "Cast Cutters", image: "cast-cutters.jpg" },
      { id: 105, name: "Orthopedic Drills", image: "orthopedic-drills.jpg" },
      { id: 106, name: "Bone Plates", image: "bone-plates.jpg" },
      { id: 107, name: "Bone Screws", image: "bone-screws.jpg" },
      { id: 108, name: "External Fixators", image: "external-fixators.jpg" },
      { id: 109, name: "Traction Equipment", image: "traction-equipment.jpg" },
      { id: 110, name: "Orthopedic Braces", image: "orthopedic-braces.jpg" },
    ],
  },
];
const AllCategory = () => {
  return (
    <section className=" main-container top-spacing grid xl:grid-cols-7 lg:grid-cols-6   md:grid-cols-4 grid-cols-2 w-full gap-5">
      {CATE_ARR.slice(0, 7).map((item) => (
        <div
          key={item?.id}
          className="  flex flex-col gap-3 items-center justify-center"
        >
          <Link href={`/categories/${item.id}`} className="w-full">
            <div
              style={{
                backgroundImage:
                  "radial-gradient(95.56% 95.56% at 50% 50%, #FFFFFF 0%, #BDDEFF 100%)",
              }}
              className=" w-full h-40  rounded-3xl flex items-center justify-center cursor-pointer"
            >
              <img
                src={item?.image}
                className=" w-20 h-20 object-contain "
                alt=""
              />
            </div>
          </Link>
          <p className="cursor-pointer">{item?.name}</p>
        </div>
      ))}
    </section>
  );
};

export default AllCategory;
