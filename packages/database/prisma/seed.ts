import { PrismaClient, UserRole, CatStatus, CatGender, AdoptionStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seed...');

  // ─── Clean up existing data ────────────────────────────────────────────────
  await prisma.adoption.deleteMany();
  await prisma.cat.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Existing data cleared.');

  // ─── Seed Users ───────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin Gatinhos',
      email: 'admin@gatinhosdoparque.org',
      password: hashedPassword,
      phone: '(11) 98765-4321',
      role: UserRole.ADMIN,
    },
  });

  const volunteer = await prisma.user.create({
    data: {
      name: 'Maria Voluntária',
      email: 'maria@gatinhosdoparque.org',
      password: hashedPassword,
      phone: '(11) 91234-5678',
      role: UserRole.VOLUNTEER,
    },
  });

  const adopters = await Promise.all([
    prisma.user.create({
      data: {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        password: hashedPassword,
        phone: '(11) 99887-7665',
        role: UserRole.ADOPTER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Ana Costa',
        email: 'ana.costa@email.com',
        password: hashedPassword,
        phone: '(11) 98765-1234',
        role: UserRole.ADOPTER,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Carlos Oliveira',
        email: 'carlos@email.com',
        password: hashedPassword,
        phone: '(11) 97654-3210',
        role: UserRole.ADOPTER,
      },
    }),
  ]);

  console.log(`✅ Created ${3 + adopters.length} users (admin, volunteer, 3 adopters).`);

  // ─── Seed Cats ────────────────────────────────────────────────────────────
  const cats = await Promise.all([
    // Available cats
    prisma.cat.create({
      data: {
        name: 'Mingau',
        age: 2,
        breed: 'Vira-lata',
        description:
          'Mingau é um gatinho muito carinhoso e brincalhão. Adora receber carinho e é ótimo para famílias com crianças.',
        status: CatStatus.AVAILABLE,
        gender: CatGender.MALE,
        isVaccinated: true,
        isNeutered: true,
        weight: 3.5,
      },
    }),
    prisma.cat.create({
      data: {
        name: 'Mel',
        age: 1,
        breed: 'Siamês',
        description:
          'Mel é uma gatinha curiosa e inteligente. Tem os olhos azuis deslumbrantes e pelagem creme.',
        status: CatStatus.AVAILABLE,
        gender: CatGender.FEMALE,
        isVaccinated: true,
        isNeutered: false,
        weight: 2.8,
      },
    }),
    prisma.cat.create({
      data: {
        name: 'Bolinha',
        age: 3,
        breed: 'Persa',
        description:
          'Bolinha é calmo, independente e perfeito para apartamento. Ama dormir no sol e observar pássaros.',
        status: CatStatus.AVAILABLE,
        gender: CatGender.MALE,
        isVaccinated: true,
        isNeutered: true,
        weight: 4.2,
      },
    }),
    prisma.cat.create({
      data: {
        name: 'Pipoca',
        age: 0,
        breed: 'Vira-lata',
        description:
          'Pipoca é um filhote super enérgico que adora brincar. Precisa de uma família ativa!',
        status: CatStatus.AVAILABLE,
        gender: CatGender.FEMALE,
        isVaccinated: false,
        isNeutered: false,
        weight: 1.1,
      },
    }),
    prisma.cat.create({
      data: {
        name: 'Thor',
        age: 5,
        breed: 'Maine Coon',
        description:
          'Thor é grande, majestoso e gentil. Apesar do tamanho, é extremamente dócil com todos.',
        status: CatStatus.AVAILABLE,
        gender: CatGender.MALE,
        isVaccinated: true,
        isNeutered: true,
        weight: 7.0,
      },
    }),
    prisma.cat.create({
      data: {
        name: 'Nina',
        age: 4,
        breed: 'Angorá',
        description:
          'Nina é elegante e reservada, mas uma vez que te conquista, jamais te larga.',
        status: CatStatus.AVAILABLE,
        gender: CatGender.FEMALE,
        isVaccinated: true,
        isNeutered: true,
        weight: 3.8,
      },
    }),
    // Reserved cat
    prisma.cat.create({
      data: {
        name: 'Pretinho',
        age: 2,
        breed: 'Vira-lata',
        description:
          'Pretinho é todo preto com um olho diferente de cada cor. É um gatinho raro e cheio de personalidade!',
        status: CatStatus.RESERVED,
        gender: CatGender.MALE,
        isVaccinated: true,
        isNeutered: false,
        weight: 3.2,
      },
    }),
    // Adopted cat
    prisma.cat.create({
      data: {
        name: 'Fofinha',
        age: 3,
        breed: 'Ragdoll',
        description:
          'Fofinha encontrou um lar amoroso. Era tão carinhosa que qualquer um se apaixonava.',
        status: CatStatus.ADOPTED,
        gender: CatGender.FEMALE,
        isVaccinated: true,
        isNeutered: true,
        weight: 4.5,
      },
    }),
    // In treatment cat
    prisma.cat.create({
      data: {
        name: 'Rajado',
        age: 1,
        breed: 'Tabby',
        description:
          'Rajado está em tratamento veterinário, mas logo estará disponível para adoção.',
        status: CatStatus.IN_TREATMENT,
        gender: CatGender.MALE,
        isVaccinated: false,
        isNeutered: false,
        weight: 2.5,
      },
    }),
  ]);

  console.log(`✅ Created ${cats.length} cats.`);

  // ─── Seed Adoptions ───────────────────────────────────────────────────────
  const fofinha = cats.find((c) => c.name === 'Fofinha')!;
  const pretinho = cats.find((c) => c.name === 'Pretinho')!;

  const adoptions = await Promise.all([
    // Completed adoption
    prisma.adoption.create({
      data: {
        catId: fofinha.id,
        adopterId: adopters[0]!.id,
        status: AdoptionStatus.COMPLETED,
        notes: 'Adoção realizada com sucesso. Família perfeita para a Fofinha!',
      },
    }),
    // Pending adoption for reserved cat
    prisma.adoption.create({
      data: {
        catId: pretinho.id,
        adopterId: adopters[1]!.id,
        status: AdoptionStatus.PENDING,
        notes: 'Interessado em adotar o Pretinho. Aguardando entrevista.',
      },
    }),
    // Approved adoption
    prisma.adoption.create({
      data: {
        catId: cats[0]!.id,
        adopterId: adopters[2]!.id,
        status: AdoptionStatus.APPROVED,
        notes: 'Aprovado! Aguardando data de retirada.',
      },
    }),
  ]);

  console.log(`✅ Created ${adoptions.length} adoptions.`);

  console.log('\n🎉 Seed completed successfully!');
  console.log('─'.repeat(50));
  console.log('📧 Admin credentials:');
  console.log('   Email:    admin@gatinhosdoparque.org');
  console.log('   Password: password123');
  console.log('─'.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
