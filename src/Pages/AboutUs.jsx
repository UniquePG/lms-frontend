import AboutMainImg from "../assets/aboutMainImage.png"
import CarausalSlide from "../Components/CarausalSlide"
import { celebrities } from "../Helpers/celebritiesData"
import HomeLayout from "../Layouts/HomeLayout"

const AboutUs = () => {
  return (
    <HomeLayout>

        <div className="px-20 pt-20 flex flex-col text-white">
            <div className="flex items-center mx-10 gap-5">
                <section className="w-1/2 space-y-10">
                    <h1 className="text-5xl text-yellow-500 font-semibold ">
                        Affordable and Quality education
                    </h1>

                    <p className="text-xl text-gray-600">
                        Our goal is to provide affordable and quality education to the world.
                        We are providing the platform for the aspriring teachers and students to share their skills, creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind.
                    </p>

                </section>

                <div className="w-1/2 ">
                    <img 
                    id="test1"
                    style={{
                        filter: "drop-shadow(0px -1px 1px 2px rgb(0,0,0))"
                    }}
                    src={AboutMainImg} 
                    alt="about us main image"
                    className="drop-shadow-xl"
                    />
                </div>

            </div>

            {/* carausal */}
            <div className="carousel w-1/2 my-16 m-auto">

            {
                celebrities && celebrities.map( (celebrity) => (<CarausalSlide 
                                                                    {...celebrity} 
                                                                    key={celebrity.pageNo}  
                                                                    totalPage={celebrities.length}
                                                                    />) )
            }

            </div>


            

        </div>

    </HomeLayout>
      )
}

export default AboutUs