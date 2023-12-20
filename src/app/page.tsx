import AuthorIntroPhrase from '@/components/AuthorIntroPhrase';
import Image from '@/components/Image';
import Text from '@/components/Text';
import { getAuthor } from '@/useCases/authors/get-author';
import { getJobHistory } from '@/useCases/jobHistory/get-job-history';
import { Github, Instagram, Linkedin } from 'lucide-react';

const Home = async () => {
  const author = await getAuthor({ slug: 'lucas' });
  const jobHistory = await getJobHistory({ orderBy: 'dateFrom desc' });

  return (
    <div className="text-gray-400 selection:bg-cyan-400 selection:text-cyan-900">
      <div className="md:flex md:justify-between md:gap-12">
        <div className="pb-4 pt-[120px] md:sticky md:top-0 md:flex md:max-h-screen md:w-1/2 md:flex-col ">
          <h1 className="inline select-none bg-gradient-to-r from-indigo-500 from-10% to-sky-500 to-90%  bg-clip-text text-5xl font-bold text-white">
            Lucas Silveira.
          </h1>
          <AuthorIntroPhrase />
          <div className="mt-8 max-w-[360px] overflow-hidden rounded-lg transition-all duration-300 hover:grayscale-0 md:max-w-none md:grayscale">
            <Image value={author.image} isInline={false} />
          </div>

          <div className="social mt-4 flex gap-2 md:mt-auto">
            <a
              className="transition-colors duration-300 hover:text-gray-200"
              href="https://www.instagram.com/lucaxsilveira/"
              target="_blank"
            >
              <Instagram />
            </a>
            <a
              className="transition-colors duration-300 hover:text-gray-200"
              href="https://github.com/lucaxsilveira"
              target="_blank"
            >
              <Github />
            </a>
            <a
              className="transition-colors duration-300 hover:text-gray-200"
              href="https://www.linkedin.com/in/lucax-silveira/"
              target="_blank"
            >
              <Linkedin />
            </a>
          </div>
        </div>

        <div className="text-bold-white pt-4 leading-6 md:w-1/2 md:pt-[230px]">
          <Text value={author.bio} useComponents={false} />

          <section className="job-history mt-8 md:mt-36">
            {jobHistory.map(
              ({
                company,
                position,
                formattedDates: { dateFrom, dateTo, distance },
              }) => (
                <div key={company} className="mt-8">
                  <h3 className="text-xl font-bold text-gray-200">{company}</h3>
                  <h4 className="text-gray-400">{position}</h4>

                  <p className="mt-2 text-sm text-gray-400">
                    {`${dateFrom} – ${dateTo || 'momento'} • ${distance}`}
                  </p>
                </div>
              ),
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
