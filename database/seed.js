/* eslint-env node */
import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_SERVICE_ROLE'])

const testingUserEmail = process.env.SUPABASE_EMAIL
if (!testingUserEmail) {
  console.error('Have you forgot to add SUPABASE_EMAIL to your .env file?')
  process.exit()
}

const primaryUserExists = async () => {
  console.log('Checking if primary test user exists...')
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', 'aung_than_soe')
    .single()

  if (error) {
    console.log('Primary test user not found. Will create one.')
    return false
  }

  console.log('Primary test user is found.')
  return data?.id
}

const createPrimaryUser = async () => {
  console.log('Creating primary test user...')
  const firstName = 'Aung'
  const lastName = 'Than Soe'
  const userName = 'aung_than_soe'
  const email = testingUserEmail
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: 'password',
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: firstName + ' ' + lastName,
        username: userName
      }
    }
  })

  if (error) {
    logErrorAndExit('Users', error)
  }

  if (data) {
    const userId = data.user.id
    await supabase.from('profiles').insert({
      id: userId,
      full_name: firstName + ' ' + lastName,
      username: userName,
      bio: 'The main testing account',
      avatar_url: `https://i.pravatar.cc/150?u=${data.user.id}`
    })

    console.log('Primary test user created successfully.')
    return userId
  }
}

const seedProjects = async (entires, userId) => {
  console.log('Seeding Projects ....')
  const projects = []
  for (let i = 0; i < entires; i++) {
    const name = faker.lorem.words(3)
    projects.push({
      name: name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      description: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([userId])
    })
  }
  const { data, error } = await supabase.from('projects').insert(projects).select('id')
  if (error) return logErrorAndExit('Projects', error)

  console.log('Projects seeded successfully', data)
  return data
}

const seedTasks = async (entires, projectIds, userId) => {
  console.log('Seeding Tasks ....')
  const tasks = []
  for (let i = 0; i < entires; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      profile_id: userId,
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([userId])
    })
  }
  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')
  if (error) return logErrorAndExit('Tasks', error)

  console.log('Tasks seeded successfully', data)
  return data
}

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  )
  process.exit(1)
}

const seedDatabase = async (entriesPerTable) => {
  let userId = await primaryUserExists()

  if (!userId) {
    userId = await createPrimaryUser()
  }

  const projects = await seedProjects(entriesPerTable, userId)
  const projectsIds = projects.map((project) => project.id)
  await seedTasks(entriesPerTable, projectsIds, userId)
}

await seedDatabase(10)
