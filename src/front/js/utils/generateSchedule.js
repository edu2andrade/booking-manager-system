export const generateSchedule = (startHour, finishHour) => {
  // Convert start and finish hours to minutes
  const startMinutes = startHour * 60;
  const finishMinutes = finishHour * 60;

  const totalBlocks = Math.floor((finishMinutes - startMinutes) / 30) + 1;
  const schedule = [];

  // Generate the schedule blocks
  for (let i = 0; i < totalBlocks; i++) {
    // Calculate the current block's start time in minutes
    const blockStartMinutes = startMinutes + i * 30;

    // Convert the start time back to hours and minutes
    const blockStartHour = Math.floor(blockStartMinutes / 60);
    const blockStartMinute = blockStartMinutes % 60;

    // Create a string representation of the block's start time
    const blockStartTime = `${blockStartHour
      .toString()
      .padStart(2, '0')}:${blockStartMinute === 0 ? '00' : '30'}`;

    // Push the current block's start time to the schedule array
    schedule.push(blockStartTime);
  }

  // Return the generated schedule
  return schedule;
};
