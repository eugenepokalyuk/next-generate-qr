export default function AboutSection() {
    return (
        <section className="flex justify-center items-center flex-col w-full lg:p-0 p-4">
            <article className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 m-4">
                <div>
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p>This is a simple about page for our Next.js application. Here you can add more information about your project, team, or any other details you would like to share with your visitors.</p>
                </div>
            </article>
        </section>
    );
}