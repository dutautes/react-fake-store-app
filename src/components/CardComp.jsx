import { Card } from "flowbite-react";

export default function CardComp() {
    return (
        <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="https://tse4.mm.bing.net/th/id/OIP.Qx9U2KLsPyPNQmgF8yKXdQHaJ4?cb=defcache2&pid=ImgDet&defcache=1&w=179&h=238&c=7&dpr=1,3&o=7&rm=3"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy
      </h5>
    </Card>
    );
}