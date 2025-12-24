export default function ContactForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Placeholder - will be replaced with Google Forms integration
        alert("Form submitted! Google Forms integration coming soon.");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-zinc-400 mb-2"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg 
                             text-white placeholder-zinc-500 
                             focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                             transition-colors duration-200"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-zinc-400 mb-2"
                >
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg 
                             text-white placeholder-zinc-500 
                             focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                             transition-colors duration-200"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-400 mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg 
                             text-white placeholder-zinc-500 
                             focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                             transition-colors duration-200"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-400 mb-2"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg 
                             text-white placeholder-zinc-500 
                             focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                             transition-colors duration-200 resize-none"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 
                         text-white font-semibold rounded-lg 
                         hover:from-cyan-400 hover:to-cyan-500 
                         transform hover:scale-[1.02] 
                         transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                Submit
            </button>
        </form>
    );
}
