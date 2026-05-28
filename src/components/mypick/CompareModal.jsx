import List from "../common/list/list";
import styles from "./Modal.module.css";

const companies = [
  {
    id: 1,
    name: "코드잇",
    category: "에듀테크",
    imageUrl: "https://placehold.co/80x80",
  },
  {
    id: 2,
    name: "카카오",
    category: "IT",
    imageUrl: "https://placehold.co/80x80",
  },
  {
    id: 3,
    name: "네이버",
    category: "IT",
    imageUrl: "https://placehold.co/80x80",
  },
  {
    id: 4,
    name: "토스",
    category: "핀테크",
    imageUrl: "https://placehold.co/80x80",
  },
  {
    id: 5,
    name: "당근마켓",
    category: "커머스",
    imageUrl: "https://placehold.co/80x80",
  },
];

const CompareModal = ({ onSelect }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {companies.map((company) => (
          <List
            key={company.id}
            imageUrl={company.imageUrl}
            title={company.name}
            subtle={company.category}
            label="선택하기"
            onSelect={() => {
              onSelect(company);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CompareModal;
