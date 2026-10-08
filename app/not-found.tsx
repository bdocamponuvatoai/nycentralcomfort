import { photos } from '@/content/assets';
import { Button, Container, Eyebrow, Photo } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="pt-40 pb-16 sm:pt-52">
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="display t-1 mt-6 max-w-4xl">
          This room is <span className="accent">out of our ductwork.</span>
        </h1>
        <p className="lead mt-6 max-w-xl">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="ghost">
            Our services
          </Button>
        </div>
        <Photo
          photo={photos.emptyWall}
          sizes="(min-width: 1320px) 1280px, 100vw"
          className="mt-16 aspect-[1672/940]"
          eager
        />
      </Container>
    </section>
  );
}
