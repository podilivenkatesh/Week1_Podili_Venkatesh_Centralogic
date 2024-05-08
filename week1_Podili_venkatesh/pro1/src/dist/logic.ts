// logic.ts

export function splitString(inputString: string): { revisedString: string } {
    const revisedString = inputString.replace('_', ' ');
    return { revisedString };
  }
  