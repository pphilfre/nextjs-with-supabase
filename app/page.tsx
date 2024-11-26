import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function Home() {
  return (
    <div>
      
      <div>
                    <header className="flex justify-between items-center p-4 bg-white shadow-md">
                        <div className="text-blue-700 text-lg font-bold">Logo</div>
                        <nav className="flex space-x-4">
                            <a href="#" className="text-blue-700 hover:text-blue-900 transition duration-300">Overview</a>
                            <a href="#" className="text-blue-700 hover:text-blue-900 transition duration-300">Features</a>
                            <a href="#" className="text-blue-700 hover:text-blue-900 transition duration-300">About</a>
                            <a href="#" className="text-blue-700 hover:text-blue-900 transition duration-300">Contact</a>
                            <div className="flex space-x-2">
                                <a href="#" className="text-blue-700 hover:text-blue-900 transition duration-300 p-2 rounded-full border border-blue-700 hover:border-blue-900"><i className="fas fa-user-plus"></i></a>
                                <a href="#" className="text-blue-700 hover:text-blue-900 transition duration-300 p-2 rounded-full border border-blue-700 hover:border-blue-900"><i className="fas fa-sign-in-alt"></i></a>
                            </div>
                        </nav>
                    </header>
                    <main className="text-center py-20">
                        <h1 className="text-4xl font-bold text-black">School Management</h1>
                        <p className="text-2xl text-black">like nothing before.</p>
                        <p className="text-black max-w-md mx-auto mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ipsum purus. Quisque vulputate id mauris in tincidunt. Donec et elit varius, malesuada erat eu, consequat quam.
                        </p>
                        <button className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition duration-300">Get Started</button>
                    </main>
                    <section className="bg-gradient-to-b from-blue-400 to-blue-200 py-20">
                        <h2 className="text-3xl text-center text-white mb-10">Why Choose Us?</h2>
                        <div className="grid grid-cols-3 gap-10 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="bg-white p-4 rounded-full inline-block">
                                    <i className="fas fa-money-bill-wave text-4xl"></i>
                                </div>
                                <p className="text-white mt-4">Free</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-white p-4 rounded-full inline-block">
                                    <i className="fas fa-laptop-code text-4xl"></i>
                                </div>
                                <p className="text-white mt-4">Latest Technology</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-white p-4 rounded-full inline-block">
                                    <i className="fas fa-database text-4xl"></i>
                                </div>
                                <p className="text-white mt-4">Supabase Database</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-white p-4 rounded-full inline-block">
                                    <i className="fas fa-upload text-4xl"></i>
                                </div>
                                <p className="text-white mt-4">Open - Source</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-white p-4 rounded-full inline-block">
                                    <i className="fas fa-database text-4xl"></i>
                                </div>
                                <p className="text-white mt-4">Supabase Database</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-white p-4 rounded-full inline-block">
                                    <i className="fas fa-server text-4xl"></i>
                                </div>
                                <p className="text-white mt-4">Built for Scaling</p>
                            </div>
                        </div>
                    </section>
                </div>
    </div>
  );
}

