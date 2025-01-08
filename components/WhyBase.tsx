import { AnimatedCBLogo } from './animated-icons/AnimatedCBLogo'
import { AnimatedShield } from './animated-icons/AnimatedShield'
import { AnimatedLayers } from './animated-icons/AnimatedLayers'

export function WhyBase() {
  const whyBase = [
    {
      title: "Full stack in a few clicks",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry",
      icon: <AnimatedLayers />,
    },
    {
      title: "Battle-tested",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry",
      icon: <AnimatedShield />,
    },
    {
      title: "Coinbase connection",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry",
      icon: <AnimatedCBLogo />,
    },
  ]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          {whyBase.map((whyBase, index) => (
            <div key={index} className="flex flex-col items-start space-y-2">
              <div className="mb-2">
                {whyBase.icon}
              </div>
              <h3 className="text-base font-bold tracking-tight">{whyBase.title}</h3>
              <p className="text-neutral-400">{whyBase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

