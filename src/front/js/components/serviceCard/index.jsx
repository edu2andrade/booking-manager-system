import React from "react";
import "./styles.css"

export const ServiceCard = ({ services, handleDelete }) => {
  return (
    <>
      {services.map((service) => {
        return !service.is_active ? null : (
          <div className="list-service" key={service.id}>
            <div className="text-list-service">
              <p className="text-servic">{service.name}</p>
            </div>
            <button className="btn-list-service me-4">Edit</button>
            <button
              className="btn-list-service"
              onClick={() => handleDelete(service.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};



// import React from "react";
// import styles from './styles.module.css';

// export const ServiceCard = ({ services, handleDelete }) => {
//   return (
//     <>
//       {services.map((service) => {
//         return !service.is_active ? null : (
//           <div className={styles.list-service} key={service.id}>
//             <div className={styles.text-list-service}>
//               <p className={styles.text-servic}>{service.name}</p>
//             </div>
//             <button className={styles.btn-list-service}>Edit</button>
//             <button
//               className={styles.btn-list-service}
//               onClick={() => handleDelete(service.id)}
//             >
//               Delete
//             </button>
//           </div>
//         );
//       })}
//     </>
//   );
// };
