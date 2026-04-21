import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert } from "@/components/ui/Alert";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Seo } from "@/components/common/Seo";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureShowcaseSection } from "@/components/sections/FeatureShowcaseSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { StatsSection } from "@/components/sections/StatsSection";
import {
  capabilityHighlights,
  fallbackHomeData,
  trustedBrands
} from "@/constants/mockData";
import { ProductGrid } from "@/features/shop/components/ProductGrid";
import { useApiQuery } from "@/hooks/useApiQuery";
import { cmsService } from "@/services/cmsService";

export default function HomePage() {
  const { data, error, isLoading } = useApiQuery(() => cmsService.getHome(), []);
  const content = data || fallbackHomeData;

  if (isLoading) {
    return <LoadingScreen fullScreen label="Loading homepage" />;
  }

  return (
    <>
      <Seo
        title="Premium SaaS and Commerce Infrastructure"
        description="Launch a premium storefront, recurring revenue engine, and operator-grade dashboard from one platform."
      />
      <HeroSection hero={content.settings?.hero} />

      {error ? (
        <div className="shell pt-6">
          <Alert>
            Live CMS data is unavailable right now, so this page is showing polished fallback content.
          </Alert>
        </div>
      ) : null}

      <section className="py-8">
        <div className="shell flex flex-wrap items-center justify-between gap-5 border-y border-border/70 py-5 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {trustedBrands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </section>

      <FeatureShowcaseSection items={capabilityHighlights} />
      <StatsSection />

      <section className="section-space">
        <div className="shell">
          <SectionHeader
            eyebrow="Curated products"
            title="Premium operating assets for modern digital businesses."
            description="Every asset is built for teams selling design systems, automation kits, and high-value digital products."
          />
          <div className="mt-12">
            <ProductGrid products={content.featuredProducts || []} />
          </div>
          <div className="mt-10">
            <Button as={Link} to="/shop" variant="outline">
              View full catalog
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section-space bg-surface">
        <div className="shell">
          <SectionHeader
            eyebrow="Pricing"
            title="Choose a plan that fits your operating tempo."
            description="Subscription plans unlock analytics, customer lifecycle tooling, and premium automation infrastructure."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {(content.plans || []).map((plan) => (
              <div
                key={plan._id}
                className="rounded-[2rem] border border-border bg-background p-7"
              >
                <p className="text-2xl">{plan.name}</p>
                <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
                <p className="mt-8 text-4xl">
                  ${plan.priceMonthly}
                  <span className="text-base text-muted-foreground"> / month</span>
                </p>
                <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
                  {(plan.features || []).map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
                <Button as={Link} to="/pricing" className="mt-8 w-full">
                  View plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Proof"
            title="Built for teams that care about the business underneath the interface."
            description="Auren combines front-end polish with real backend rigor: subscriptions, payments, order flows, and admin control."
          />
          <div className="grid gap-6">
            {(content.settings?.testimonials || []).map((item) => (
              <div
                key={item.name}
                className="rounded-[2rem] border border-border bg-surface p-6"
              >
                <p className="text-lg leading-8">"{item.quote}"</p>
                <p className="mt-5 text-sm text-muted-foreground">
                  {item.name}, {item.role} at {item.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="FAQ"
            title="Answers for teams evaluating a serious commercial platform."
            description="Use Auren for subscriptions, digital commerce, admin analytics, and content operations from the same foundation."
          />
          <Accordion
            items={(content.settings?.faq || []).map((item, index) => ({
              id: String(index),
              title: item.question,
              content: item.answer
            }))}
          />
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
