import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";

interface userpost {
  postTitle: string;
  postImage?: string;
}

const Userpost = ({ postTitle, postImage }: userpost) => {
  return (
    <div className="mx-4 relative mt-12 border-t-2  border-gray-700 ">
      <Link to={"/markzuckerberg/post/1"}>
        <div className="flex flex-row gap-3 m-4">
          <div className="flex flex-col items-center  justify-between">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/zuck-avatar.png" />
              <AvatarFallback className="text-white">MZ</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex flex-row items-center">
                <Avatar className="w-8 h-8 -ml-1">
                  <AvatarImage src="/avatar1.jpg" />
                  <AvatarFallback className="text-white">MZ</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatar2.jpg" />
                  <AvatarFallback className="text-white">MZ</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <Avatar className="w-8 h-8 ml-4">
                  <AvatarImage src="/avatar3.jpg" />
                  <AvatarFallback className="text-white">MZ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className=" flex flex-row gap-2 font-bold text-md lg:text-lg">
              <p className="text-white font-bold text-md lg:text-lg">
                markzuckerberg
              </p>
              <img src="/verified.png" alt="" className="w-4 h-4 mt-2" />
            </div>
            <div>
              <p className="text-white">{postTitle}</p>
            </div>
            {postImage && (
              <div className="">
                <img src={postImage} className="w-full " alt="" />
              </div>
            )}
          </div>

          <div className="absolute right-0 mr-2">
            <p className="text-white">
              <BsThreeDots className="w-6 h-6" />
            </p>
          </div>
        </div>
      </Link>

      <div className="mb-4 ml-20 "></div>
    </div>
  );
};

export default Userpost;
